package com.wangnz.springboot.mvc.model;

import java.util.List;

public class AccoutInfo {
	private String acctId;
	private String acctAmt;
	private List<CardInfo> cardList;

	public String getAcctId() {
		return acctId;
	}

	public void setAcctId(String acctId) {
		this.acctId = acctId;
	}

	public String getAcctAmt() {
		return acctAmt;
	}

	public void setAcctAmt(String acctAmt) {
		this.acctAmt = acctAmt;
	}

	public List<CardInfo> getCardList() {
		return cardList;
	}

	public void setCardList(List<CardInfo> cardList) {
		this.cardList = cardList;
	}

}
