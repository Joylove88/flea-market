package com.abc.modules.sys.dao;

import com.abc.common.dao.BaseDao;
import com.abc.modules.sys.entity.WhiteIpEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 白名单
 *
 * @author ayong ayong@gmail.com
 * @since 1.0.0 2022-08-23
 */
@Mapper
public interface WhiteIpDao extends BaseDao<WhiteIpEntity> {
	
}