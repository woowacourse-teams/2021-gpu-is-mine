package mine.is.gpu.gpuserver.fixture;

import mine.is.gpu.gpuserver.dto.request.GpuBoardRequest;
import mine.is.gpu.gpuserver.dto.request.GpuServerRequest;

public class GpuServerFixtures {

    private static final String GPU_BOARD_NAME = "BOARD_NAME";
    private static final String NEW_GPU_BOARD_NAME = "NEW_BOARD_NAME";

    private static final Long GPU_BOARD_PERFORMANCE = 10L;
    private static final Long NEW_GPU_BOARD_PERFORMANCE = 20L;

    private static final String GPU_SERVER_NAME = "SERVER_NAME";
    private static final String NEW_GPU__SERVER_NAME = "NEW_SERVER_NAME";

    private static final Long GPU_SERVER_MEMORY_SIZE = 10L;
    private static final Long NEW_SERVER_MEMORY_SIZE = 20L;

    private static final Long GPU_SERVER_DISK_SIZE = 10L;
    private static final Long NEW_GPU_SERVER_DISK_SIZE = 20L;

    public static GpuBoardRequest gpuBoardCreationRequest() {
        return new GpuBoardRequest(GPU_BOARD_NAME, GPU_BOARD_PERFORMANCE);
    }

    public static GpuBoardRequest gpuBoardUpdateRequest() {
        return new GpuBoardRequest(NEW_GPU_BOARD_NAME, NEW_GPU_BOARD_PERFORMANCE);
    }

    public static GpuServerRequest gpuServerCreationRequest() {
        return new GpuServerRequest(
                GPU_SERVER_NAME,
                GPU_SERVER_MEMORY_SIZE,
                GPU_SERVER_DISK_SIZE,
                gpuBoardCreationRequest()
        );
    }

    public static GpuServerRequest gpuServerUpdateRequest() {
        return new GpuServerRequest(
                NEW_GPU__SERVER_NAME,
                NEW_SERVER_MEMORY_SIZE,
                NEW_GPU_SERVER_DISK_SIZE,
                gpuBoardUpdateRequest()
        );
    }
}
