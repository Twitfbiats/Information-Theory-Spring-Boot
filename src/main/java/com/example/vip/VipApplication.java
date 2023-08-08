package com.example.vip;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
public class VipApplication 
{
	public static void main(String[] args) 
	{
		SpringApplication.run(VipApplication.class, args);

		String os = System.getProperty("os.name").toLowerCase();
		Runtime rt = Runtime.getRuntime();
		String url = "http://localhost/";
		
		try 
		{
			if (os.indexOf("win") >= 0) rt.exec("rundll32 url.dll,FileProtocolHandler " + url);	
			else if (os.indexOf("mac") >= 0) rt.exec("open " + url);
			else
			{
				String[] browsers = { "google-chrome", "firefox", "mozilla", "epiphany", "konqueror",
                                 "netscape", "opera", "links", "lynx" };
 
				StringBuffer cmd = new StringBuffer();
				for (int i = 0; i < browsers.length; i++)
					if(i == 0)
						cmd.append(String.format(    "%s \"%s\"", browsers[i], url));
					else
						cmd.append(String.format(" || %s \"%s\"", browsers[i], url)); 
					// If the first didn't work, try the next browser and so on

				rt.exec(new String[] { "sh", "-c", cmd.toString() });
			}
		} catch (Exception e) 
		{
			e.printStackTrace();
		}
	}
}

@Controller
class TestController
{
	@RequestMapping("/")
	public String mainPage()
	{
		return "test";
	}

	@RequestMapping("/entropy")
	public String entropyPage()
	{
		return "information_theory";
	}

	@RequestMapping("/encoding")
	public String encodingPage()
	{
		return "information_theory1";
	}
}
