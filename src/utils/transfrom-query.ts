import { QueryObject } from 'common/interfaces/queries.interface';
import { Op } from 'sequelize';

// todo move query transformation logic here
export function transformQuery(query) {}

export function getOrFromFilter(value: string | QueryObject) {
  if (typeof value !== 'string') {
    return {};
  }

  const values = value.split(',').map(val => ({
    [Op.or]: val
  }));

  return Object.assign({}, values);
}

export function getNestedObjectIds(value: string | QueryObject) {
  if (typeof value !== 'object') {
    return {};
  }

  const { id } = value;

  if (!id) {
    return {};
  }

  return { id: getOrFromFilter(id) };
}
