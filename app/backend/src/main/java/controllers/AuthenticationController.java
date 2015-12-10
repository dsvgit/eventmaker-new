package controllers;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;
import models.User;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import services.UsersService;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.PBEParameterSpec;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import java.security.Key;

@Path("/auth")
public class AuthenticationController {

    @Inject
    private UsersService usersService;

    private static final Logger logger = LogManager.getLogger();

    @GET @Path("/login")
    public String login(@QueryParam("login") String login, @QueryParam("password") String password) throws Exception {
        logger.log(Level.INFO, "[AUTH] login " + login + " " + password);

        User user = usersService.getByCredentials(login, password);
        if (user == null) throw new Exception("can't find user");

        byte[] salt = {
                (byte)0xc7, (byte)0x73, (byte)0x21, (byte)0x8c,
                (byte)0x7e, (byte)0xc8, (byte)0xee, (byte)0x99
        };

        int count = 20;

        PBEParameterSpec pbeParamSpec = new PBEParameterSpec(salt, count);
        PBEKeySpec pbeKeySpec = new PBEKeySpec("passsword".toCharArray());
        SecretKeyFactory keyFac = SecretKeyFactory.getInstance("PBEWithMD5AndDES");
        SecretKey pbeKey = keyFac.generateSecret(pbeKeySpec);

        Key key = MacProvider.generateKey();
        String s = Jwts.builder().setSubject(user.getId().toString()).signWith(SignatureAlgorithm.HS512, pbeKey).compact();

        logger.log(Level.INFO, "[AUTH] key " + key.toString());
        logger.log(Level.INFO, "[AUTH] s " + s);

        String subj = Jwts.parser().setSigningKey(pbeKey).parseClaimsJws(s).getBody().getSubject();
        logger.log(Level.INFO, "[AUTH] subj " + subj);

        return s;
    }

}
