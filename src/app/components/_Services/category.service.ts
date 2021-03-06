import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../_Models/Category";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  public token: any = localStorage.getItem("access_token");
  constructor(private http: HttpClient) {}
  baseUrl = environment.backendbaseUrl + "categories";

  add(ncategory: Category) {
    return this.http.post<Category>(this.baseUrl + "/add", ncategory, {
      headers: { authorization: this.token },
    });
  }

  getAllCategories() {
    return this.http.get<Category[]>(this.baseUrl);
  }
  editCategory(id: string, category: any) {
    return this.http.put<Category>(this.baseUrl + "/" + id, category, {
      headers: { authorization: this.token },
    });
  }
  deleteById(id: string) {
    return this.http.delete<Category>(this.baseUrl + "/delete/" + id, {
      headers: { authorization: this.token },
    });
  }
  getCategoryById(id: string) {
    return this.http.get<Category>(this.baseUrl + "/" + id,);
  }
  getCategoryProduct(id: string) {
    return this.http.get<Category[]>(this.baseUrl + "/products/" + id);
  }
}
