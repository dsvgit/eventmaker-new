package controllers.filters;

import io.jsonwebtoken.Jwts;
import models.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import services.Identity;
import services.UsersService;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.PBEParameterSpec;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@Stateless
public class Authenticator {

    private static final Logger logger = LogManager.getLogger();


    public boolean isAuthTokenValid(String token) throws NoSuchAlgorithmException, InvalidKeySpecException {

        logger.info( "[Authenticator] token " + token );

        byte[] salt = {
                (byte)0xc7, (byte)0x73, (byte)0x21, (byte)0x8c,
                (byte)0x7e, (byte)0xc8, (byte)0xee, (byte)0x99
        };

        int count = 20;

        PBEParameterSpec pbeParamSpec = new PBEParameterSpec(salt, count);
        PBEKeySpec pbeKeySpec = new PBEKeySpec("passsword".toCharArray());
        SecretKeyFactory keyFac = SecretKeyFactory.getInstance("PBEWithMD5AndDES");
        SecretKey pbeKey = keyFac.generateSecret(pbeKeySpec);

        String subj = Jwts.parser().setSigningKey(pbeKey).parseClaimsJws(token).getBody().getSubject();
        logger.info( "[Authenticator] subj " + subj );



        logger.info( "[Authenticator] parse " + Integer.parseInt(subj) );
//        logger.info( "[Authenticator] user service " + usersService );
//
//        User user = usersService.getUser(Integer.parseInt(subj));
//        if (user == null) return false;
//
//        identity.setUid(user.getId());

        return true;
    }
}
