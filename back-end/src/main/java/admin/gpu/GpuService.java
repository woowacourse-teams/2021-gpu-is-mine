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

    public GpuResponses gpuList(Long labId) {
        return new GpuResponses();
    }

    public void modify(GpuRequest gpuRequest, Long labId, Long gpuId) {
    }

    public void delete(Long labId, Long gpuId) {
    }
}
