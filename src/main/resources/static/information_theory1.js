$(document).ready(function() 
{
	var s, w, c, code, tree, final_tree, SF_code;
	
	function reset_() {s = '', w = [], c = [], code = [], tree = [], final_tree = {}}
	function reset_1() {SF_code = []}
	
	$('#encode').click(function()
	{
		handleHuffman()
		handleShannonFano()
	})
	
	// Huffman Section
	function handleHuffman()
	{
		reset_()
		s = $('#plain-text').val().split('')
		w = getUniqueWords(s);
		//console.log(w)
		c = getCountWords(w, s)
		//console.log(c)
		
		tree = getBeginTree(w, c)
		//console.log(JSON.stringify(tree))
		final_tree = getProcessTree(tree)[0]
		//console.log(JSON.stringify(final_tree, null, 9))
		printPath(final_tree, '', null, code)
		//console.log(code)
		encoded_text = getHuffman(s, code)
		//console.log(encoded_text)
		
		$('#table-body').empty()
		var data = ''
		data += '<tr><th>Huffman Encoded Text</th><td><textarea cols="150"'
				+ ' value=' + encoded_text + '>' + encoded_text + '</textarea></td></tr>'
		data += '<tr><th>All characters</th><td>' + w + '</td></tr>'
		data += '<tr><th>Occurrence</th><td>' + c + '</td></tr>'
		data += '<tr><th>Code Table</th><td>' 
		for (const key in code)
		{
			data += code[key].character + ' - ' + code[key].code + '<br>'
		}
		data += '</td></tr>'
		
		$('#table-body').append(data)
	}
	
	function getUniqueWords(s1)
	{
		w1 = [];
		for (var i=0;i<s1.length;i++)
			if (!w1.includes(s1[i])) w1.push(s1[i])
		return w1;
	}
	
	function getCountWords(w1, s1)
	{
		c1 = []
		temp = s1.toString()
		var specialChars = ['[', ']', '{', '}', '(', ')', '.', '*', '+', '?', '^', '$', '\\', '|'];
		for (var i=0;i<w1.length;i++)
		{
			var re
			if (specialChars.includes(w[i])) re = new RegExp("\\" + w1[i], 'g')
			else re = new RegExp(w1[i], 'g')
			c1[i] = (temp.match(re) || []).length
		}
		return c1;
	}
	
	function getBeginTree(w1, c1)
	{
		tree1 = []
		for (var i=0;i<w1.length;i++)
			tree1[i] = {left: null,right: null,value: c1[i],character: w1[i]}
		return tree1;
	}
	
	function getProcessTree(tree1)
	{
		while (tree1.length > 1)
		{
			min1_index=0;
			min1 = tree1[0]
			for (var i=0;i<tree1.length;i++)
			{
				if (min1.value > tree1[i].value)
				{
					min1 = tree1[i]
					min1_index = i
				}
			}
			tree1.splice(min1_index, 1);
			
			min2_index=0;
			min2 = tree1[0]
			for (var i=0;i<tree1.length;i++)
			{
				if (min2.value > tree1[i].value)
				{
					min2 = tree1[i]
					min2_index = i
				}
			}
			tree1.splice(min2_index, 1);
			
			temp = {left: min1, right: min2, value: (min1.value+min2.value), character: null}
			tree1.push(temp)
		}
		
		return tree1
	}
	
	function printPath(tree1, path, direction, code1)
	{
		if (direction == 'left') path+=0
		if (direction == 'right') path+=1
		
		if (tree1.character != null) code1.push({character: tree1.character, code: path})
		else
		{
			printPath(tree1.left, path, 'left', code1)
			printPath(tree1.right, path, 'right', code1)
		}
	}
	
	function getHuffman(s1 , code1)
	{
		huffman_text = ''
		for (var i=0;i<s1.length;i++)
			for (var j=0;j<code1.length;j++) 
				if (code1[j].character == s1[i]) 
					huffman_text += code1[j].code
		return huffman_text
	}	
	
	// Shanon Fano Section
	function handleShannonFano()
	{
		reset_1()
		var test_array = getTestArray(w, c)
		console.log(JSON.stringify(test_array))
		sort_it(test_array)
		console.log(JSON.stringify(test_array))
		processSF(test_array, "", SF_code)
		console.log(JSON.stringify(SF_code))
		var SF_encoded_text = getSF(s, SF_code)
		//console.log(SF_encoded_text)
		
		$('#table-body1').empty()
		var data = ''
		data += '<tr><th>Shannon Fano Encoded Text</th><td><textarea cols="150"'
				+ ' value=' + SF_encoded_text + '>' + SF_encoded_text + '</textarea></td></tr>'
		data += '<tr><th>Code Table</th><td>' 
		for (const key in SF_code)
		{
			data += SF_code[key].character + ' - ' + SF_code[key].code + '<br>'
		}
		data += '</td></tr>'
		
		var entropy = calculateEntropy(w, c)
		var average_length = calculateAverageLength(w, c, SF_code)
		data += '<tr><th>Entropy</th><td>' + entropy + '</td></tr>'
		data += '<tr><th>Average Length</th><td>' + average_length + '</td></tr>'
		data += '<tr><th>Efficiency</th><td>' + (entropy/average_length)*100 + '%</td></tr>'
				
		$('#table-body1').append(data)
	}
	
	function calculateEntropy(w1, c1)
	{
		var total_length = 0;
		for (var i=0;i<w1.length;i++)
			total_length+=c1[i]
		var h = 0
		for (var i=0;i<w1.length;i++)
			h-=(c1[i]/total_length)*Math.log2(c1[i]/total_length)
		return h
	}
	
	function calculateAverageLength(w1, c1, SF_code1)
	{
		var total_length = 0;
		for (var i=0;i<w1.length;i++)
			total_length+=c1[i]
		
		var code_length = []
		for (var i=0;i<w1.length;i++)
			for (var j=0;j<w1.length;j++)
				if (w1[i] == SF_code1[j].character) code_length[i] = SF_code1[j].code.length
			
		var average_length = 0
		for (var i=0;i<w1.length;i++)
			average_length += (c1[i]/total_length)*code_length[i]
		
		return average_length
	}
	
	function getTestArray(w1, c1)
	{
		var test_array1 = []
		for (var i=0;i<w1.length;i++)
			test_array1.push({character: w1[i], value: c1[i]})
		return test_array1
	}
	
	function getSF(s1 , SF_code1)
	{
		var SF_encoded_text1 = ""
		for (var i=0;i<s1.length;i++)
			for (var j=0;j<SF_code1.length;j++)
				if (s1[i] == SF_code1[j].character) SF_encoded_text1 += SF_code1[j].code
		return SF_encoded_text1
	}
	
	function processSF(s1, path, SF_code)
	{
		split_it_temp = split_it(s1)
		var left = split_it_temp[0]
		var right = split_it_temp[1]
		// return
		if (left.length == 1) SF_code.push({character: left[0].character, code: path+0})
		else if (left.length != 0) processSF(left, path+0, SF_code)
		
		if (right.length == 1) SF_code.push({character: right[0].character, code: path+1})
		else if (right.length != 0) processSF(right, path+1, SF_code)
	}

	function sort_it(s1)
	{
		var temp;
		for (var i=0;i<s1.length;i++)
			for (var j=i;j<s1.length;j++)
				if (s1[i].value > s1[j].value)
				{
					temp = s1[i]
					s1[i] = s1[j]
					s1[j] = temp
				}
	}
	
	function split_it(s1)
	{
		var left_needed = 0
		var right_needed = 9999999999
		var index = 0
		var s_temp = []
		for (var i=0;i<s1.length;i++)
		{
			var left_total = 0
			for (var j=0;j<i;j++) left_total += s1[j].value
			var right_total = 0
			for (var k=i;k<s1.length;k++) right_total += s1[k].value
			if (Math.abs(left_total - right_total) < Math.abs(left_needed - right_needed))
			{
				left_needed = left_total
				right_needed = right_total
				index = i
			}
		}
		s_temp[0] = s1.slice(0, index)
		s_temp[1] = s1.slice(index, s1.length)
		console.log(JSON.stringify(s_temp[0]))
		console.log(JSON.stringify(s_temp[1]))
		return s_temp
	}
})