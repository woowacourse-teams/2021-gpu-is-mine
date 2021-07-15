package queue;

import admin.gpuserver.domain.Job;
import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

/**
 * Queue: Default(lab_[labId]), Exchange: Default("jobLearning"), bind: ExchangeName <-> QueueName
 * routingKey routingKey: Default(routingKey.[labId])
 */

@Service
public class QueueService {

    private static final String LEARNING_EXCHANGE_NAME = "jobLearning";
    private static final String PREFIX_QUEUE_NAME = "lab_";
    private static final String PREFIX_ROUTING_KEY = "routingKey.";

    private RabbitTemplate rabbitTemplate;
    private AmqpAdmin amqpAdmin;

    public QueueService(RabbitTemplate rabbitTemplate,
        AmqpAdmin amqpAdmin) {
        this.rabbitTemplate = rabbitTemplate;
        this.amqpAdmin = amqpAdmin;
    }

    public void createLearningConnection(Long labId) {
        createQueue(labId);
        createExchange(LEARNING_EXCHANGE_NAME);
        createBind(new Queue(PREFIX_QUEUE_NAME + labId),
            new TopicExchange(LEARNING_EXCHANGE_NAME),
            labId);
    }

    // TODO: JOB 연결시 사용
    public void pushLearningJob(Job job, Long labId) {
        rabbitTemplate.convertAndSend(LEARNING_EXCHANGE_NAME,
            "routingKey." + labId,
            job.toString());
    }

    public void pushMessage(String message, Long labId) {
        rabbitTemplate.convertAndSend(LEARNING_EXCHANGE_NAME,
            "routingKey." + labId,
            message);
    }

    public void deleteQueue(Long labId) {
        String queueName = PREFIX_QUEUE_NAME + labId;
        amqpAdmin.deleteQueue(queueName);
    }

    private void createQueue(Long labId) {
        String queueName = PREFIX_QUEUE_NAME + labId;
        amqpAdmin.declareQueue(new Queue(queueName, false));
    }

    private void createExchange(String topicExchangeName) {
        amqpAdmin.declareExchange(new TopicExchange(topicExchangeName));
    }

    private void createBind(Queue queue, TopicExchange topicExchange, Long labId) {
        amqpAdmin.declareBinding(
            BindingBuilder.bind(queue).to(topicExchange).with(PREFIX_ROUTING_KEY + labId));
    }
}
