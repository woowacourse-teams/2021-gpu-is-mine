class ApiService {
  constructor(key) {
    this.key = key;
    this.base = "https://gpuismine.kro.kr/api/";
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
  }
}

export default ApiService;
