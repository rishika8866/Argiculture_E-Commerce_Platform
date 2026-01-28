package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="role")
public class Role {

	
	@Id
	int rid;
	
	String rname;
	
	
	


	public Role() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getRid() {
		return rid;
	}

	public void setRid(int rid) {
		this.rid = rid;
	}

	public String getRname() {
		return rname;
	}

	public void setRname(String rname) {
		this.rname = rname;
	}

	public Role(int rid, String rname) {
		super();
		this.rid = rid;
		this.rname = rname;
	}
	
	
	
	
}
