package admin;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.CommandLineRunner;


public class Runner implements CommandLineRunner {

    private final RabbitTemplate rabbitTemplate;
    private final Receiver receiver;

    public Runner(Receiver receiver, RabbitTemplate rabbitTemplate) {
        this.receiver = receiver;
        this.rabbitTemplate = rabbitTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Sending message...");
        for (int i = 0; i < 1000; i++) {
            rabbitTemplate.convertAndSend(MessagingRabbitmqApplication.topicExchangeName,
                "routingKey.1",
                "Hello from RabbitMQ!" + i);
        }
    }
}
