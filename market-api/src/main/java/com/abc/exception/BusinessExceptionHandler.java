/**
 * Copyright (c) 2018 人人开源 All rights reserved.
 *
 * https://www.renren.io
 *
 * 版权所有，侵权必究！
 */

package com.abc.exception;

import com.abc.common.exception.ErrorCode;
import com.abc.common.exception.BusinessException;
import com.abc.common.utils.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 异常处理器
 *
 * @author Mark sunlightcs@gmail.com
 * @since 1.0.0
 */
@RestControllerAdvice
public class BusinessExceptionHandler {
	private static final Logger logger = LoggerFactory.getLogger(BusinessExceptionHandler.class);

	/**
	 * 处理自定义异常
	 */
	@ExceptionHandler(BusinessException.class)
	public Result handleRenException(BusinessException ex){
		Result result = new Result();
		result.error(ex.getCode(), ex.getMsg());

		return result;
	}

	@ExceptionHandler(DuplicateKeyException.class)
	public Result handleDuplicateKeyException(DuplicateKeyException ex){
		Result result = new Result();
		result.error(ErrorCode.DB_RECORD_EXISTS);

		return result;
	}

	@ExceptionHandler(Exception.class)
	public Result handleException(Exception ex){
		logger.error(ex.getMessage(), ex);

		return new Result().error();
	}
}