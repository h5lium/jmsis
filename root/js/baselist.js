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
	if(confirm('ע�⣺ɾ������Ϣ�����ָܻ����Ƿ�ȷ�ϼ�����'))
	{
		this.form.submit();
		return true;
	}
	return false;
}

function initSearch(idx,key)//��ʼ����ѯ������ѯ���������Ƿ�淶
{
	if (typeof SearchTypes=="undefined")
	{
		return false;
	}
	if (idx==-1)
	{
		alert("��ѡ����Ҫ���ҵ���Ϣ�");
		return false;
	}
	if (trim(key)=="")
	{
		alert("�ؼ��ֲ���Ϊ�գ�");
		return false;
	}
	dataType=SearchTypes[idx];
	switch(dataType)//0���֣�1�ַ���2����,3ʱ�䣬4����ʱ��
	{
		case 0:
			if (isNaN(key))
			{
				alert("��ѯ����Ĺؼ��ֲ���һ����Ч�����֣�");
				return false;
			}
			break;
		case 2:
			if (!isDate(key))
			{
				alert("��ѯ����Ĺؼ��ֱ�����һ�����ڣ�������2008-02-31��");
				return false;
			}
			break;
		case 3:
			if (!isTime2(key))
			{
				alert("��ѯ����Ĺؼ��ֱ�����һ��ʱ�䣡������21:08��");
				return false;
			}
			break;
		case 4:
			if (!isDateTime(key))
			{
				alert("��ѯ����Ĺؼ��ֱ�����һ������+ʱ�䣡������2008-02-31 21:08��");
				return false;
			}
			break;
	}
	return true;
}
//��Ӧ�޸Ĳ�ѯ����
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
				HtmlStr+='	<option value="0">����</option>';
				HtmlStr+='	<option value="1">������</option>';
				HtmlStr+='	<option value="2">����</option>';
				HtmlStr+='	<option value="3">������</option>';
				HtmlStr+='	</select>';
				break;
			default:
				HtmlStr+='	<option value="0">����</option>';
				HtmlStr+='	<option value="1">������</option>';
				HtmlStr+='	<option value="4">����</option>';
				HtmlStr+='	<option value="5">С��</option>';
				HtmlStr+='	<option value="6">���ڵ���</option>';
				HtmlStr+='	<option value="7">С�ڵ���</option>';
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