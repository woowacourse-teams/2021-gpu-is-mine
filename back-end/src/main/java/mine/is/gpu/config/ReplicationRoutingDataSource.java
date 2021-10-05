package mine.is.gpu.config;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.transaction.support.TransactionSynchronizationManager;

public class ReplicationRoutingDataSource extends AbstractRoutingDataSource {
    public static final String DATASOURCE_KEY_MASTER = "master";
    public static final String DATASOURCE_KEY_SLAVE = "slave";

    @Override
    protected Object determineCurrentLookupKey() {
        return TransactionSynchronizationManager.isCurrentTransactionReadOnly() ? DATASOURCE_KEY_SLAVE
                : DATASOURCE_KEY_MASTER;
    }
}
