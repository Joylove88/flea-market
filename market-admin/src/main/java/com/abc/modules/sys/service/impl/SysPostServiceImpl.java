/**
 * Copyright (c) 2021 人人开源 All rights reserved.
 *
 * https://www.renren.io
 *
 * 版权所有，侵权必究！
 */
package com.abc.modules.sys.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.abc.common.utils.ConvertUtils;
import com.abc.modules.sys.dao.SysPostDao;
import com.abc.modules.sys.service.SysPostService;
import com.abc.modules.sys.service.SysUserPostService;
import com.abc.common.service.impl.CrudServiceImpl;
import com.abc.modules.sys.dto.SysPostDTO;
import com.abc.modules.sys.entity.SysPostEntity;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * 岗位管理
 *
 * @author Mark sunlightcs@gmail.com
 */
@Service
public class SysPostServiceImpl extends CrudServiceImpl<SysPostDao, SysPostEntity, SysPostDTO> implements SysPostService {
    @Autowired
    private SysUserPostService sysUserPostService;

    @Override
    public QueryWrapper<SysPostEntity> getWrapper(Map<String, Object> params){
        QueryWrapper<SysPostEntity> wrapper = new QueryWrapper<>();

        String postCode = (String)params.get("postCode");
        wrapper.like(StringUtils.isNotBlank(postCode), "post_code", postCode);

        String postName = (String)params.get("postName");
        wrapper.like(StringUtils.isNotBlank(postName), "post_name", postName);

        String status = (String)params.get("status");
        wrapper.eq(StringUtils.isNotBlank(status), "status", status);

        wrapper.orderByAsc("sort");

        return wrapper;
    }

    @Override
    public List<SysPostDTO> list(Map<String, Object> params) {
        List<SysPostEntity> entityList = baseDao.selectList(getWrapper(params));

        return ConvertUtils.sourceToTarget(entityList, SysPostDTO.class);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delete(Long[] ids) {
        //删除岗位
        baseDao.deleteBatchIds(Arrays.asList(ids));

        //删除岗位用户关系
        sysUserPostService.deleteByPostIds(ids);
    }
}