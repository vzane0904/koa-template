// 创建数据库
export const createLibrary = 'CREATE DATABASE IF NOT EXISTS test_db'
// 创建角色表
export const createUse = `CREATE TABLE if not exists table_02  (
    id varchar(36) NOT NULL COMMENT 'id',
    name varchar(36) DEFAULT NULL COMMENT '姓名',
    age varchar(36) DEFAULT NULL COMMENT '年龄'
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='人员表';`
