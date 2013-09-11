function CheckAll(form)  
{
	for (var i=0;i<form.elements.length;i=i+1)
	{
		var e = form.elements[i];
		if (e.name != 'chkall'&&e.type=="checkbox")
		{
			e.checked = form.chkall.checked;
		}
	}
}

function delalert()
{
	if(confirm('注意：删除的信息将不能恢复！是否确认继续？'))
	{
		this.form.submit();
		return true;
	}
	return false;
}

function initSearch(idx,key)//初始化查询，检查查询参数输入是否规范
{
	if (typeof SearchTypes=="undefined")
	{
		return false;
	}
	if (idx==-1)
	{
		alert("请选择需要查找的信息项！");
		return false;
	}
	if (trim(key)=="")
	{
		alert("关键字不能为空！");
		return false;
	}
	dataType=SearchTypes[idx];
	switch(dataType)//0数字，1字符，2日期,3时间，4日期时间
	{
		case 0:
			if (isNaN(key))
			{
				alert("查询输入的关键字不是一个有效的数字！");
				return false;
			}
			break;
		case 2:
			if (!isDate(key))
			{
				alert("查询输入的关键字必须是一个日期！（例：2008-02-31）");
				return false;
			}
			break;
		case 3:
			if (!isTime2(key))
			{
				alert("查询输入的关键字必须是一个时间！（例：21:08）");
				return false;
			}
			break;
		case 4:
			if (!isDateTime(key))
			{
				alert("查询输入的关键字必须是一个日期+时间！（例：2008-02-31 21:08）");
				return false;
			}
			break;
	}
	return true;
}
//响应修改查询参数
function changeSearchCondition(idx)
{
	if (typeof SearchTypes=="undefined")
	{
		return;
	}
	var HtmlStr="";
	HtmlStr+='	<select name="SearchOperator" id="SearchOperator" style="width:60px">';
	if (idx==-1)
	{
		HtmlStr+='	</select>';
	}
	else
	{
		switch (SearchTypes[idx])
		{
			case 1:
				HtmlStr+='	<option value="0">等于</option>';
				HtmlStr+='	<option value="1">不等于</option>';
				HtmlStr+='	<option value="2">包含</option>';
				HtmlStr+='	<option value="3">不包含</option>';
				HtmlStr+='	</select>';
				break;
			default:
				HtmlStr+='	<option value="0">等于</option>';
				HtmlStr+='	<option value="1">不等于</option>';
				HtmlStr+='	<option value="4">大于</option>';
				HtmlStr+='	<option value="5">小于</option>';
				HtmlStr+='	<option value="6">大于等于</option>';
				HtmlStr+='	<option value="7">小于等于</option>';
				HtmlStr+='	</select>';
		}
	}
	if (SearchTypes[idx]==2)
	{
		document.all["SeachContent"].className="Wdate";
		document.all["SeachContent"].onfocus=function (){WdatePicker({isShowClear:false,readOnly:true});};
	}
	else
	{
		document.all["SeachContent"].className="";
		document.all["SeachContent"].onfocus=function (){};
	}
	document.all["SearchOperator"].outerHTML=HtmlStr;
}