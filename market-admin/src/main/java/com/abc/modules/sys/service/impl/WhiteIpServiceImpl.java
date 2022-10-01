package com.abc.modules.sys.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.abc.common.service.impl.CrudServiceImpl;
import com.abc.modules.sys.dao.WhiteIpDao;
import com.abc.modules.sys.dto.WhiteIpDTO;
import com.abc.modules.sys.entity.WhiteIpEntity;
import com.abc.modules.sys.service.WhiteIpService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * 白名单
 *
 * @author ayong ayong@gmail.com
 * @since 1.0.0 2022-08-23
 */
@Service
public class WhiteIpServiceImpl extends CrudServiceImpl<WhiteIpDao, WhiteIpEntity, WhiteIpDTO> implements WhiteIpService {

    @Override
    public QueryWrapper<WhiteIpEntity> getWrapper(Map<String, Object> params){
        String id = (String)params.get("id");

        QueryWrapper<WhiteIpEntity> wrapper = new QueryWrapper<>();
        wrapper.eq(StringUtils.isNotBlank(id), "id", id);

        return wrapper;
    }


}