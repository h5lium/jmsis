
function trim(inStr)//ȥ���ַ������˵Ŀո�
{
	var re = new RegExp("^([ \f\r\t\n]*)","ig");
	inStr = inStr.replace(re, "");    
	re = new RegExp("([ \f\r\t\n]*)$","ig");
	inStr = inStr.replace(re, "");  
	return inStr;  
}

function isDate(inStr)//����ַ����Ƿ�����"YYYY:MM:DD"
{
    var daTemp="",flag=false;
	var ss=inStr.split("-");
	if(ss.length==3){
		if (!isNaN(ss[0]) && !isNaN(ss[1]) && !isNaN(ss[2])){
			daStr=new Date(ss[0],ss[1]-1,ss[2]);
			daTemp+=daStr.getFullYear()+"-";
			intMonth=(daStr.getMonth()+1)+"";
			intMonth=formatDate(intMonth);
			daTemp+=intMonth+"-"; 
			intDate=daStr.getDate()+"";
            intDate=formatDate(intDate);
			daTemp+=intDate; 
			//alert("date: "+inStr+":"+daTemp);
			if (daTemp == inStr){
				 flag=true;
				 //alert("date success");
			}
		}
	}
	return flag;
}

function isSDate(inStr)//����ַ����Ƿ�����"YYYY:MM"
{
    var daTemp="",flag=false;
	var ss=inStr.split("-");
	if(ss.length==2){
		if (!isNaN(ss[0]) && !isNaN(ss[1])){
			daStr=new Date(ss[0],ss[1]-1,"01");
			daTemp+=daStr.getFullYear()+"-";
			intMonth=(daStr.getMonth()+1)+"";
			intMonth=formatDate(intMonth);
			daTemp+=intMonth+"-"; 
			intDate="01";
			daTemp+=intDate; 
			//alert("date: "+inStr+":"+daTemp);
			if (daTemp == inStr+"-01"){
				 flag=true;
				 //alert("date success");
			}
		}
	}
	return flag;
}

function formatDate(intvalue)//����ַ���ֻ��һλ��������ǰ���0������ȡ����������ַ��� 
{
	Strvalue="00"+intvalue;
	temp=Strvalue.length;
	return Strvalue.substring(temp-2,temp);
}

function isTime2(inStr){//��֤�ַ����Ƿ�������"hh:mm"
	var tiTemp="",flag=false,hourTemp="",minutesTemp="";
	//alert("in time2");
	var ss=inStr.split(":");
	if(ss.length==2){
		if(!isNaN(ss[0]) && !isNaN(ss[1])){
		//alert("dffa");
			 date=new Date();
             date.setHours(ss[0],ss[1],10);
			 hourTemp=date.getHours()+"";
             hourTemp=formatDate(hourTemp);
			 minutesTemp=date.getMinutes()+"";
			 minutesTemp=formatDate(minutesTemp);
             tiTemp=hourTemp+":"+minutesTemp;
			 if(tiTemp==inStr){
				 flag=true;
				 //alert("time2 success");
			 }
		}
	}
	return flag;
}

function isTime3(inStr){//��֤�ַ����Ƿ�������"hh:mm:ss"
	var tiTemp="",flag=false,hourTemp="",minutesTemp="",secTemp="";
	//alert("in tiem3");
	var ss=inStr.split(":");
	if(ss.length==3){
	//alert("wrf");
        if(!isNaN(ss[0]) && !isNaN(ss[1]) && !isNaN(ss[2])){
		//alert("wrf1");
            date=new Date();
			date.setHours(ss[0],ss[1],ss[2]);
			hourTemp=date.getHours()+"";
			hourTemp=formatDate(hourTemp);
			minutesTemp=date.getMinutes()+"";
			minutesTemp=formatDate(minutesTemp);
            secTemp=date.getSeconds()+"";
			//alert(secTemp);
			sscTemp=formatDate(secTemp);
			tiTemp=hourTemp+":"+minutesTemp+":"+secTemp;
			//alert(tiTemp+":"+inStr);
			if(tiTemp==inStr){
				flag=true;
				//alert("time3 success");
			}
		}
	}
	return flag;
}

function isDateTime(inStr){//��֤�ַ����Ƿ�������"YYYY-MM-DD hh:mm:ss"����"YYYY-MM-DD hh:mm"
	var flag=false;
	var ss=inStr.split(" ");
    //alert(ss[0]+"    "+ss[1]);
	if(ss.length==2)
	{
	//alert("X"+ss[1]+"X");
		if((isTime2(ss[1]) || isTime3(ss[1])) && isDate(ss[0]))
		{
	        flag=true;
		}
	}
	return flag;
}

function fixSql(Str){//��ȫSQL�еĵ�����
	var temp="";
	var ss=Str.split("'");
	for(i=0;i<ss.length-1;i=i+1){
		temp=temp+ss[i]+"''";
	}
	temp=temp+ss[ss.length-1];
	return temp;
}

function isInt(Str)//����ַ����Ƿ�������
{
	var flag=false;
	if(!isNaN(Str))
	{
		flag=true;
		Str=Str+"";
		for(i=0;i<Str.length;i=i+1)
		{
			if(Str.charAt(i)=='.')
			{
                flag=false;
			}
		}
	}
	return flag;
}

function checkFile(Str)
{
	var flag=false;
	var ss=Str.split(".");
	//alert(ss.length);
	var temp=ss[(ss.length-1)]+"";
	temp = temp.toUpperCase( );
	if(temp=="GIF" || temp=="BMP" || temp=="JPG")
	{
		flag=true;
	}
	return flag;
}

function checkFileType(fname,exts)//��δ��ɡ��ж��ļ�����չ���Ƿ���exts�����е�,exts�е���չ����"|"�ָ�,���޴�Сд������"gif|jpg|BMP"
{
	var flag=false;
	var ss=fname.split(".");
	var es=exts.split("|");
	//alert(ss.length);
	var temp=ss[(ss.length-1)]+"";
	temp = temp.toUpperCase( );
	alert(temp+"::"+es.length);
	return flag;
}

function checkGif(Str)
{
	var flag=false;
	var ss=Str.split(".");
	//alert(ss.length);
	var temp=ss[(ss.length-1)]+"";
	temp = temp.toUpperCase( );
	if(temp=="GIF")
	{
		flag=true;
	}
	return flag;
}

function checkTxt(Str)
{
	var flag=false;
	var ss=Str.split(".");
	//alert(ss.length);
	var temp=ss[(ss.length-1)]+"";
	temp = temp.toUpperCase();
	if(temp=="XLS" || temp=="DOC")
	{
		flag=true;
	}
	return flag;
}

function chkDat(elname,elid,dataType,nes,afocus)
{
	var chk=true;
	if (nes && trim(document.all[elid].value)=="")
	{
		alert(elname+"����Ϊ�գ�");
		chk=false;
	}
	else if (nes==false && document.all[elid].value=="")
	{
		return true;
		
	}
	switch(dataType)//0���֣�1�ַ���2����,3ʱ�䣬4����ʱ�䣬5������6ֻ�������µ�����
	{
		case 0:
			if (isNaN(document.all[elid].value))
			{
				alert(elname+"����һ����Ч�����֣�");
				chk=false;
			}
			break;
		case 5:
			if (!isInt(document.all[elid].value))
			{
				alert(elname+"����һ����Ч�����֣�");
				chk=false;
			}
			break;
		case 2:
			if (!isDate(document.all[elid].value))
			{
				alert(elname+"������һ�����ڣ�������2008-02-31��");
				chk=false;
			}
			break;
		case 6:
			if (!isSDate(document.all[elid].value))
			{
				alert(elname+"������һֻ�������µ����ڣ�������2008-02��");
				chk=false;
			}
			break;
		case 3:
			if (!isTime2(document.all[elid].value))
			{
				alert(elname+"������һ��ʱ�䣡������21:08��");
				chk=false;
			}
			break;
		case 4:
			if (!isDateTime(document.all[elid].value))
			{
				alert(elname+"������һ������+ʱ�䣡������2008-02-31 21:08��");
				chk=false;
			}
			break;
	}
	if (!chk && afocus)
	{
		document.all[elid].focus();
	}
	return chk;
}
