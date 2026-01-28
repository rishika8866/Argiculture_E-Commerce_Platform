package com.example.demo.dtos;

public class AuthResponse {

	  private String token;
	    private String uname;
	    private int role;

	    public AuthResponse(String token, String uname, int role) {
	        this.token = token;
	        this.uname = uname;
	        this.role = role;
	    }

		public String getToken() {
			return token;
		}

		public void setToken(String token) {
			this.token = token;
		}

		public String getUname() {
			return uname;
		}

		public void setUname(String uname) {
			this.uname = uname;
		}

		public int getRole() {
			return role;
		}

		public void setRole(int role) {
			this.role = role;
		}
	    
	    
	
	
}
