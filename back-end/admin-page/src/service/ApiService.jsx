class ApiService {
  constructor(key) {
    this.key = key;
    this.base = "http://localhost:8080/api/";
    this.requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    this.headers = {
      "Content-Type": "application/json",
    };
  }
  async getLabs() {
    const response = await fetch(`${this.base}labs`, this.requestOptions);
    const result = await response.json();
    return result.labResponses;
  }
  async saveLab(lab) {
    const name = lab.name;
    await fetch(`${this.base}labs`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name }),
    });
    return this.getLabs();
  }
  async deleteLab(id) {
    await fetch(`${this.base}labs/${id}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  async login(email, password){
    const response = await fetch(`${this.base}login`,{
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    })
    const result = await response.json();
    return result.accessToken;
  }
}

export default ApiService;
