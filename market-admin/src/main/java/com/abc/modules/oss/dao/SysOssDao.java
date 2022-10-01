/**
 * Copyright (c) 2018 人人开源 All rights reserved.
 *
 * https://www.renren.io
 *
 * 版权所有，侵权必究！
 */

package com.abc.modules.oss.dao;

import com.abc.common.dao.BaseDao;
import com.abc.modules.oss.entity.SysOssEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 文件上传
 * 
 * @author Mark sunlightcs@gmail.com
 */
@Mapper
public interface SysOssDao extends BaseDao<SysOssEntity> {
	
}
