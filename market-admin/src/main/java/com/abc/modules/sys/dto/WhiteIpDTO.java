package com.abc.modules.sys.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;


/**
 * 白名单
 *
 * @author ayong ayong@gmail.com
 * @since 1.0.0 2022-08-23
 */
@Data
@ApiModel(value = "白名单")
public class WhiteIpDTO implements Serializable {
    private static final long serialVersionUID = 1L;

	@ApiModelProperty(value = "ID")
	private Long id;

	@ApiModelProperty(value = "IP")
	private String ip;

	@ApiModelProperty(value = "状态  0：停用   1：正常")
	private Integer status;

	@ApiModelProperty(value = "备注")
	private String remark;

	@ApiModelProperty(value = "创建者")
	private Long creator;

	@ApiModelProperty(value = "创建时间")
	private Date createDate;

	@ApiModelProperty(value = "更新者")
	private Long updater;

	@ApiModelProperty(value = "更新时间")
	private Date updateDate;


}