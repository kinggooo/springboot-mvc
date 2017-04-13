package com.wangnz.springboot.mvc.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wangnz.springboot.mvc.model.AccoutInfo;
import com.wangnz.springboot.mvc.model.CardInfo;
import com.wangnz.springboot.mvc.service.HelloService;


@Controller
public class CardActivateController {
	@Autowired
	HelloService helloService;

	@ResponseBody
	@RequestMapping("/hello")
	public String hello() {
		return "Hello World";
	}

	@RequestMapping("/index")
	public String index(ModelMap map) {
		map.addAttribute("host", "http://blog.didispace.com");
		return "index";
	}

	@RequestMapping("/getPerson")
	public String getPerson(ModelMap map) {

		System.out.println("getPerson");

		CardInfo cardInfo1 = new CardInfo();
		cardInfo1.setCardId("1");
		cardInfo1.setCardNum("111111111111111111");

		CardInfo cardInfo2 = new CardInfo();
		cardInfo2.setCardId("2");
		cardInfo2.setCardNum("222222222222222222");

		List<CardInfo> cardList = new ArrayList<CardInfo>();
		cardList.add(cardInfo1);
		cardList.add(cardInfo2);

		AccoutInfo acctInfo = new AccoutInfo();
		acctInfo.setAcctId("acct_1");
		acctInfo.setAcctAmt("10000");
		acctInfo.setCardList(cardList);

		map.addAttribute("acctInfo", acctInfo);

		return "cardactivate/cardactivate";

	}

	@RequestMapping("/getPerson/Json")
	@ResponseBody
	public AccoutInfo getPersonRest() {

		System.out.println("getPerson");

		CardInfo cardInfo1 = new CardInfo();
		cardInfo1.setCardId("1");
		cardInfo1.setCardNum("111111111111111111");

		CardInfo cardInfo2 = new CardInfo();
		cardInfo2.setCardId("2");
		cardInfo2.setCardNum("222222222222222222");

		List<CardInfo> cardList = new ArrayList<CardInfo>();
		cardList.add(cardInfo1);
		cardList.add(cardInfo2);

		AccoutInfo acctInfo = new AccoutInfo();
		acctInfo.setAcctId("acct_1");
		acctInfo.setAcctAmt("10000");
		acctInfo.setCardList(cardList);

		return acctInfo;

	}

	@RequestMapping("/nextStep")
	@ResponseBody
	public String nextStep(String cardNum, String openId) {

		System.out.println("nextStep");
		System.out.println(cardNum);
		System.out.println(openId);

		return "0000";

	}

	@RequestMapping("/user")
	@ResponseBody
	public String callUser() {

		String hello = helloService.queryUser();

		return hello;
	}
}
