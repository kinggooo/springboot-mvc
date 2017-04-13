package com.wangnz.springboot.mvc.service;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.wangnz.springboot.mvc.model.AccoutInfo;

@Service
public class HelloService {
	private static final Logger logger = Logger.getLogger(HelloService.class);

	@Autowired
	RestTemplate restTemplate;

	final String SERVICE_NAME = "cloud-hello-service";

	public String queryUser() {
		return restTemplate.getForObject("http://" + "localhost:5555" + "/hello-srv/user",
				String.class);
	}

	private String fallbackSearchAll() {
		return "No Service";
	}

	public AccoutInfo show() {
		logger.info("remote execute show");

		Map<String, String> param = new HashMap<String, String>();
		param.put("acctId", "abc");
		param.put("acctAmt", "30000");

		return restTemplate.postForObject("http://" + SERVICE_NAME + "/show",
				null, AccoutInfo.class, param);
	}

}
