package mine.is.gpu.config;

import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import org.springframework.data.elasticsearch.config.AbstractElasticsearchConfiguration;

@Profile("dev|prod")
@Configuration
public class ElasticClientConfig extends AbstractElasticsearchConfiguration {

    private final ElasticSearchProperties properties;

    public ElasticClientConfig(ElasticSearchProperties properties) {
        this.properties = properties;
    }

    @Override
    @Bean
    public RestHighLevelClient elasticsearchClient() {
        final ClientConfiguration clientConfiguration = ClientConfiguration.builder()
                .connectedTo(properties.getHost())
                .withBasicAuth(properties.getUserName(), properties.getPassword())
                .build();

        return RestClients.create(clientConfiguration).rest();
    }
}
