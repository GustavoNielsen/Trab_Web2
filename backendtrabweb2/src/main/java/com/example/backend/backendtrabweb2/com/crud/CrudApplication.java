package trab.exemple.com.crud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "trab.exemple.repository") // <- Adicione isso
@EntityScan(basePackages = "trab.exemple.com.crud.model")        // <- Para garantir a leitura das entidades
@ComponentScan(basePackages = {"trab.exemple"}) 
@SpringBootApplication
public class CrudApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudApplication.class, args);
	}

}
