export class AppConstants {
  private static API_BASE_URL = 'http://localhost:8080/';
  private static OAUTH2_URL = AppConstants.API_BASE_URL + 'oauth2/authorization/';
  public static API_URL = AppConstants.API_BASE_URL + 'api/v1/';
  public static API_URL_USER = AppConstants.API_URL + 'user';
  public static API_URL_BOOK = AppConstants.API_URL + 'book';
  public static API_URL_ORDER_BOOK = AppConstants.API_URL + 'orderbook';
  public static AUTH_API = AppConstants.API_BASE_URL + 'api-public/v1/auth/';
  public static GOOGLE_AUTH_URL = AppConstants.OAUTH2_URL + 'google';
  public static GITHUB_AUTH_URL = AppConstants.OAUTH2_URL + 'github';
}
