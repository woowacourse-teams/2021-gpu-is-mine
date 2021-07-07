package admin.gpu;

import org.springframework.stereotype.Service;

@Service
public class GpuService {
    public GpuService() {
    }

    public int register(GpuRequest gpuRequest) {
        return 0;
    }

    public GpuResponse detail(Long labId, Long gpuId) {
        return new GpuResponse();
    }
}
