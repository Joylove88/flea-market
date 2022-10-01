/**
 * Copyright (c) 2021 人人开源 All rights reserved.
 *
 * https://www.renren.io
 *
 * 版权所有，侵权必究！
 */

package com.abc.modules.sys.dao;

import com.abc.common.dao.BaseDao;
import com.abc.modules.sys.entity.SysPostEntity;
import org.apache.ibatis.annotations.Mapper;

/**
* 岗位管理
*
* @author Mark sunlightcs@gmail.com
*/
@Mapper
public interface SysPostDao extends BaseDao<SysPostEntity> {
	
}