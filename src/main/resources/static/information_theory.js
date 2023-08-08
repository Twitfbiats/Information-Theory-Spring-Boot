$(document).ready(function()
{
	main = $('#main')
	th_tr = main.find('thead tr')
	tb = main.find('tbody')
	var m = 4, n = 4;
	var hx, hy, hxky, hykx, hxy, ixy, dpxpy, dpypx;
	
	
	$('#click-me').click(function()
	{
		//$('#main').clone([0])
		//main = $('#main').empty()[0];
		//$('#backup').clone().appendTo(main)
		
		th_tr.empty()
		tb.empty()
		m = $('#m').val()
		n = $('#n').val()
		console.log(m + "-" + n)
		th_tr.append('<th scope="col">p(X,Y)</th>')
		for (var i=1;i<n;i++) th_tr.append('<th scope="col">X' + i + '</th>')
		th_tr.append('<th scope="col">p(Y)</th>')
	
		for (var j=1;j<m;j++)
		{
			tb.append('<tr id="row-' + j + '"><th scope="row">Y' + j + '</th></tr>')
			row = $('#row-' + j)
			for (var i=1;i<=n;i++)
				row.append('<td><input id="y' + j + "x" + i + '"type="text"></td>')
			
		}
		tb.append('<tr id="row-' + m + '"><th scope="row">p(X)</th></tr>')
		for (var i=1;i<=n;i++) $('#row-' + m).append('<td><input id="y' + m + "x" + i + '"type="text"></td>')
	})

	$('#calculate').click(function()
	{
		for (var i=1;i<=m;i++)
		{
			for (var j=1;j<=n;j++)
			{
				temp = $('#y' + i + 'x' + j)
				aij = temp.val()
				if (aij.search("/") != -1)
				{
					aij = aij.split('/')
					temp.val(aij[0]/aij[1])
				}
				else
				{
					temp.val(aij)
				}
			}
		}
		cal_hx();cal_hy();cal_hykx();cal_hxky();cal_hxy();cal_hymkykx()
		cal_ixy();cal_dpxpy();cal_dpypx()
	})
	
	function cal_hx()
	{
		hx = 0;
		for (var i=1;i<n;i++)
		{
			aij = $('#y' + m + 'x' + i).val()
			hx -= aij*Math.log2(aij)
		}
		$('#hx').text(hx)
	}
	
	function cal_hy()
	{
		hy = 0;
		for (var i=1;i<m;i++)
		{
			aij = $('#y' + i + 'x' + n).val()
			hy -= aij*Math.log2(aij)
		}
		$('#hy').text(hy)
	}
	
	function cal_hykx()
	{
		hykx = 0;
		for (var i=1;i<m;i++)
		{
			for (var j=1;j<n;j++)
			{
				aij = $('#y' + i + 'x' + j).val()
				px = $('#y' + m + 'x' + j).val()
				pykx = aij/px
				mathlog = Math.log2(pykx)
				hykx -= aij*((mathlog == -Infinity) || (mathlog == Infinity) ? 0 : mathlog)
			}
		}
		$('#hykx').text(hykx)
	}
	
	function cal_hxky()
	{
		hxky = 0;
		for (var i=1;i<m;i++)
		{
			for (var j=1;j<n;j++)
			{
				aij = $('#y' + i + 'x' + j).val()
				py = $('#y' + i + 'x' + n).val()
				pxky = aij/py
				mathlog = Math.log2(pxky)
				hxky -= aij*((mathlog == -Infinity) || (mathlog == Infinity) ? 0 : mathlog)
			}
		}
		$('#hxky').text(hxky)
	}
	
	function cal_hxy()
	{
		hxy = hxky + hy;
		$('#hxy').text(hxy)
	}
	
	function cal_hymkykx()
	{
		val = hy - hykx;
		$('#hy-hykx').text(val)
	}
	
	function cal_ixy()
	{
		ixy = hx + hy - hxy;
		$('#ixy').text(ixy)
	}
	
	function cal_dpxpy()
	{
		dpxpy = 0;
		for (var j=1;j<n;j++)
		{
			px = $('#y' + n + 'x' + j).val()
			py = $('#y' + j + 'x' + m).val()
			mathlog = Math.log2(px/py)
			dpxpy += px*((mathlog == -Infinity) || (mathlog == Infinity) ? 0 : mathlog)
		}
		$('#dpxpy').text(dpxpy)
	}
	
	function cal_dpypx()
	{
		dpypx = 0;
		for (var i=1;i<m;i++)
		{
			py = $('#y' + i + 'x' + n).val()
			px = $('#y' + m + 'x' + i).val()
			mathlog = Math.log2(py/px)
			dpypx += py*((mathlog == -Infinity) || (mathlog == Infinity) ? 0 : mathlog)
		}
		$('#dpypx').text(dpypx)
	}
})