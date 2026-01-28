package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name="user")
public class Login {
	
	@Id
	int uid;
	
	String uname;
	
	
	String email;
	
	
	String contact_no;
	
	String acc_no;
	
	String password;
	
	String address;
	
	@ManyToOne
	@JoinColumn(name="rid")
	Role rid;
	
	int city_id;

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContact_no() {
		return contact_no;
	}

	public void setContact_no(String contact_no) {
		this.contact_no = contact_no;
	}

	public String getAcc_no() {
		return acc_no;
	}

	public void setAcc_no(String acc_no) {
		this.acc_no = acc_no;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Role getRid() {
		return rid;
	}

	public void setRid(Role rid) {
		this.rid = rid;
	}

	public int getCity_id() {
		return city_id;
	}

	public void setCity_id(int city_id) {
		this.city_id = city_id;
	}

	public Login(String uname, String email, String contact_no, String acc_no, String password, String address,
			Role rid, int city_id) {
		super();
		this.uname = uname;
		this.email = email;
		this.contact_no = contact_no;
		this.acc_no = acc_no;
		this.password = password;
		this.address = address;
		this.rid = rid;
		this.city_id = city_id;
	}
	

	public Login() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
	
	

}
