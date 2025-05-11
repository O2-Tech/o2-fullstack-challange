package br.com.kaindall.products.application.configs;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServiceDocsConfig {
    @Bean
    public OpenAPI configOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("Storage Service")
                        .description("")
                        .version("3.0.0"));
    }
}
