package com.abc.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.abc.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

/**
 * 白名单
 *
 * @author ayong ayong@gmail.com
 * @since 1.0.0 2022-08-23
 */
@Data
@EqualsAndHashCode(callSuper=false)
@TableName("sys_white_ip")
public class WhiteIpEntity extends BaseEntity {
	private static final long serialVersionUID = 1L;

    /**
     * IP
     */
	private String ip;
    /**
     * 状态  0：停用   1：正常
     */
	private Integer status;
    /**
     * 备注
     */
	private String remark;
    /**
     * 更新者
     */
	private Long updater;
    /**
     * 更新时间
     */
	private Date updateDate;
}