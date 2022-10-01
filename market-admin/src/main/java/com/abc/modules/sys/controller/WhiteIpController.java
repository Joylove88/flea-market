package com.abc.modules.sys.controller;

import com.abc.common.annotation.LogOperation;
import com.abc.common.constant.Constant;
import com.abc.common.page.PageData;
import com.abc.common.utils.ExcelUtils;
import com.abc.common.utils.Result;
import com.abc.common.validator.AssertUtils;
import com.abc.common.validator.ValidatorUtils;
import com.abc.common.validator.group.AddGroup;
import com.abc.common.validator.group.DefaultGroup;
import com.abc.common.validator.group.UpdateGroup;
import com.abc.modules.sys.dto.WhiteIpDTO;
import com.abc.modules.sys.excel.WhiteIpExcel;
import com.abc.modules.sys.service.WhiteIpService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;


/**
 * 白名单
 *
 * @author ayong ayong@gmail.com
 * @since 1.0.0 2022-08-23
 */
@RestController
@RequestMapping("sys/whiteip")
@Api(tags="白名单")
public class WhiteIpController {
    @Autowired
    private WhiteIpService whiteIpService;

    @GetMapping("page")
    @ApiOperation("分页")
    @ApiImplicitParams({
        @ApiImplicitParam(name = Constant.PAGE, value = "当前页码，从1开始", paramType = "query", required = true, dataType="int") ,
        @ApiImplicitParam(name = Constant.LIMIT, value = "每页显示记录数", paramType = "query",required = true, dataType="int") ,
        @ApiImplicitParam(name = Constant.ORDER_FIELD, value = "排序字段", paramType = "query", dataType="String") ,
        @ApiImplicitParam(name = Constant.ORDER, value = "排序方式，可选值(asc、desc)", paramType = "query", dataType="String")
    })
    @RequiresPermissions("sys:whiteip:page")
    public Result<PageData<WhiteIpDTO>> page(@ApiIgnore @RequestParam Map<String, Object> params){
        PageData<WhiteIpDTO> page = whiteIpService.page(params);

        return new Result<PageData<WhiteIpDTO>>().ok(page);
    }

    @GetMapping("{id}")
    @ApiOperation("信息")
    @RequiresPermissions("sys:whiteip:info")
    public Result<WhiteIpDTO> get(@PathVariable("id") Long id){
        WhiteIpDTO data = whiteIpService.get(id);

        return new Result<WhiteIpDTO>().ok(data);
    }

    @PostMapping
    @ApiOperation("保存")
    @LogOperation("保存")
    @RequiresPermissions("sys:whiteip:save")
    public Result save(@RequestBody WhiteIpDTO dto){
        //效验数据
        ValidatorUtils.validateEntity(dto, AddGroup.class, DefaultGroup.class);

        whiteIpService.save(dto);

        return new Result();
    }

    @PutMapping
    @ApiOperation("修改")
    @LogOperation("修改")
    @RequiresPermissions("sys:whiteip:update")
    public Result update(@RequestBody WhiteIpDTO dto){
        //效验数据
        ValidatorUtils.validateEntity(dto, UpdateGroup.class, DefaultGroup.class);

        whiteIpService.update(dto);

        return new Result();
    }

    @DeleteMapping
    @ApiOperation("删除")
    @LogOperation("删除")
    @RequiresPermissions("sys:whiteip:delete")
    public Result delete(@RequestBody Long[] ids){
        //效验数据
        AssertUtils.isArrayEmpty(ids, "id");

        whiteIpService.delete(ids);

        return new Result();
    }

    @GetMapping("export")
    @ApiOperation("导出")
    @LogOperation("导出")
    @RequiresPermissions("sys:whiteip:export")
    public void export(@ApiIgnore @RequestParam Map<String, Object> params, HttpServletResponse response) throws Exception {
        List<WhiteIpDTO> list = whiteIpService.list(params);

        ExcelUtils.exportExcelToTarget(response, null, "异常日志", list, WhiteIpExcel.class);
    }

}