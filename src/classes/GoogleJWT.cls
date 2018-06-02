public class GoogleJWT {
    
    public static String SCOPE = 'https://www.googleapis.com/auth/calendar';
    
    public static String getAccessToken() {       
        Auth.JWT jwt = new Auth.JWT();
        jwt.setAud(Google_Api__c.getInstance().Endpoint__c);
        jwt.setIss(Google_Api__c.getInstance().Username__c);
        jwt.setAdditionalClaims(new Map<String, Object>{'scope' => SCOPE});
        
        Auth.JWS jws = new Auth.JWS(jwt, 'google_cloud');
        
        Auth.JWTBearerTokenExchange bearer = new Auth.JWTBearerTokenExchange(Google_Api__c.getInstance().Endpoint__c, jws);
        
        String token = bearer.getAccessToken();
        return token;
    }
}