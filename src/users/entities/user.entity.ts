import * as crypto from 'crypto';
import {
  AllowNull,
  AutoIncrement,
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Length,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { UserErrors } from 'users/constants';

const DEFAULT_BYTE_SIZE = 16;
const DEFAULT_ITERATIONS = 10000;
const DEFAULT_KEY_LENGTH = 64;

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Unique
  @Length({ max: 30, min: 5, msg: UserErrors.USERNAME_LENGTH })
  @NotEmpty({ msg: UserErrors.USERNAME_REQUIRED })
  @Column({
    type: DataType.STRING,
    unique: {
      name: 'unique_username_id',
      msg: UserErrors.USERNAME_UNIQUE
    }
  })
  username: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(45),
    unique: {
      name: 'unique_email_id',
      msg: UserErrors.EMAIL_UNIQUE
    },
    validate: {
      isEmail: {
        msg: UserErrors.INVALID_EMAIL
      },
      notEmpty: {
        msg: UserErrors.EMAIL_REQUIRED
      }
    }
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.VIRTUAL,
    validate: {
      notEmpty: {
        msg: UserErrors.PASSWORD_REQUIRED
      }
    }
  })
  password: string;

  @Column
  hashedPassword: string;

  @Column
  salt: string;

  @BeforeCreate
  static async createPassword(user: User) {
    await user._updatePassword();
  }

  @BeforeUpdate
  static async updatePassword(user: User) {
    if (user.changed('password')) {
      await user._updatePassword();
    }
  }

  authenticate(password: string): boolean {
    return this.hashedPassword === this.encryptPassword(password);
  }

  private encryptPassword(password: string): string {
    const salt = new Buffer(this.salt, 'base64');
    return crypto
      .pbkdf2Sync(password, salt, DEFAULT_ITERATIONS, DEFAULT_KEY_LENGTH, 'sha512')
      .toString('base64');
  }

  private async makeSalt(): Promise<string> {
    return crypto.randomBytes(DEFAULT_BYTE_SIZE).toString('base64');
  }

  private async _updatePassword() {
    if (this.password) {
      this.salt = await this.makeSalt();
      this.hashedPassword = this.encryptPassword(this.password);
    }
  }
}
