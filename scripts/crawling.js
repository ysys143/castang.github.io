const axios = require('axios');
const cheerio = require('cheerio');

// HTML 가져오는 함수
const getHTML = async (keyword) => {
    try {
        // 백틱(`)을 사용해 템플릿 리터럴 적용
        const response = await axios.get(`https://www.inflearn.com/courses?s=${encodeURI(keyword)}`);
        return response.data;  // HTML 데이터 반환
    } catch (e) {
        console.log(e);
    }
};

// 파싱 함수
const parsing = (page) => {
    const $ = cheerio.load(page);  // HTML을 cheerio로 파싱
    const courses = [];  // 코스 정보를 저장할 배열
    const $courseList = $(".matine-1avyp1d");  // 선택자 확인 필요

    $courseList.each((idx, node) => {
        const title = $(node).find(".course_title:eq(0)").text();
        courses.push(title);  // 코스 제목을 배열에 추가
    });

    return courses;  // 코스 배열 반환
};

// 코스 정보 가져오기 함수
const getCourse = async (keyword) => {
    const html = await getHTML(keyword);  // HTML을 가져옴
    const courses = parsing(html);  // HTML 파싱하여 코스 추출
    console.log(courses);  // 결과 출력
};

// '자바스크립트' 관련 코스 정보 크롤링
getCourse('자바스크립트');
