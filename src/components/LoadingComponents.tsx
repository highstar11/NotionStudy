export default function LoadingComponents() {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-busy="true"
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-white"
        >
            <div className="flex flex-col items-center gap-6 px-6">
                <div className="relative h-12 w-12">
                    <div className="absolute inset-0 rounded-full border-[3px] border-neutral-200" />
                    <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[#242424] motion-reduce:animate-none" />
                </div>

                <div className="flex flex-col items-center gap-1.5 text-center">
                    <p className="flex items-center text-base font-semibold tracking-tight text-[#242424]">
                        글을 불러오는 중
                        <span aria-hidden className="ml-1 inline-flex">
                          <span className="animate-bounce [animation-delay:0ms] motion-reduce:animate-none">.</span>
                          <span className="animate-bounce [animation-delay:150ms] motion-reduce:animate-none">.</span>
                          <span className="animate-bounce [animation-delay:300ms] motion-reduce:animate-none">.</span>
                        </span>
                    </p>
                    <p className="text-sm text-neutral-500">잠시만 기다려 주세요</p>
                </div>
            </div>
        </div>
    );
}