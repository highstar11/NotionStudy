export default function LoadingComponents() {
    return (
        <div className="flex w-full h-[100vh] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                {/* 로딩 애니메이션 */}
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />

                {/* 로딩 문구 */}
                <p className="animate-pulse text-md mt-2 text-gray-500">
                    조금만 기다려 주세요...
                </p>
            </div>
        </div>
    );
}
