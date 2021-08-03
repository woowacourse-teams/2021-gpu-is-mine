package mine.is.gpu.gpuserver.fixture;

import mine.is.gpu.gpuserver.dto.request.GpuBoardRequest;
import mine.is.gpu.gpuserver.dto.request.GpuServerRequest;
import mine.is.gpu.gpuserver.dto.request.GpuServerUpdateRequest;

public class GpuServerFixtures {

    private static final String GPU_BOARD_NAME = "BOARD_NAME";
    private static final Long GPU_BOARD_PERFORMANCE = 10L;

    private static final String GPU_SERVER_NAME = "SERVER_NAME";
    private static final String NEW_GPU__SERVER_NAME = "NEW_SERVER_NAME";

    private static final Long GPU_SERVER_MEMORY_SIZE = 10L;
    private static final Long GPU_SERVER_DISK_SIZE = 10L;

    public static GpuBoardRequest gpuBoardCreationRequest() {
        return new GpuBoardRequest(GPU_BOARD_NAME, GPU_BOARD_PERFORMANCE);
    }

    public static GpuServerRequest gpuServerCreationRequest() {
        return new GpuServerRequest(
                GPU_SERVER_NAME,
                GPU_SERVER_MEMORY_SIZE,
                GPU_SERVER_DISK_SIZE,
                gpuBoardCreationRequest()
        );
    }

    public static GpuServerUpdateRequest gpuServerUpdateRequest() {
        return new GpuServerUpdateRequest(NEW_GPU__SERVER_NAME);
    }
}
