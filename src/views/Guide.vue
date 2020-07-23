<template>
    <div id="mainDiv">
        <v-container>
            <v-card>
                <div style="padding:10px;">
                    <h3>주의사항</h3>   
                    <ul>
                        <li>태그를 이동시 클릭시 위치 이동이 발생 할 수 있습니다.</li>
                        <li>PDF파일 저장시 파일 이름은 이름표.pdf로 저장됩니다.</li>
                        <li>새로고침 시에 모든 작업 내용이 날라갑니다.</li>
                        <li>새로고침 없이 뒤로 이동해 다른 이미지 파일 선택시 작업했던 내용이 그대로 적용 됩니다.</li>
                        <li>가운데 정렬 버튼을 사용시 모든 태그들이 다 적용 됩니다. 일부만 적용하려고 할 시에는 가운데 정렬 버튼을 클릭 후에 위치를 잡아야 합니다.</li>
                        <li>현재 작업 내용을 저장하는 Template저장 기능은 기본 제공되는 이미지 한에서만 가능 합니다. 사용자가 원하는 이미지를 불러온 후 적용 할 수 있게 수정할 예정입니다.</li>
                    </ul>
                    <h3 style="margin-top:70px;">요청 및 문의사항</h3>
                    <ul>
                        <li>불편 사항이나 개선 사항, 기본 제공 이미지 추가 요청시에는 tkdansg@naver.com 로 이메일을 보내주시기 바랍니다.</li>

                    </ul>

                </div>
            </v-card>
        </v-container>
    </div>
</template>

<script>

export default {
    name:'Guide',

}
</script>

<style>
    li{
        margin:10px;
    }
</style>