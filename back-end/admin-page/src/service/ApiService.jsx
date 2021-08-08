class ApiService {
  constructor(key) {
    this.key = key;
    this.base = "https://gpuismine.kro.kr/api/";
    this.requestOptions = {
      method: "GET",
      redirect: "follow",
    };
  }
  async getLabs() {
    const response = await fetch(`${this.base}labs`, this.requestOptions);
    const result = await response.json();
    return result.labResponses;
  }
}

export default ApiService;
