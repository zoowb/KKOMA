package com.ssafy.kkoma.domain.product.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.kkoma.domain.member.constant.MemberType;
import com.ssafy.kkoma.domain.member.constant.Role;
import com.ssafy.kkoma.domain.member.entity.Member;
import com.ssafy.kkoma.domain.member.repository.MemberRepository;
import com.ssafy.kkoma.domain.product.dto.response.ProductDetailResponse;
import com.ssafy.kkoma.domain.product.entity.Category;
import com.ssafy.kkoma.domain.product.repository.CategoryRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.ssafy.kkoma.domain.product.dto.response.ProductSummary;
import com.ssafy.kkoma.domain.product.entity.Product;
import com.ssafy.kkoma.domain.product.repository.ProductRepository;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@EnableJpaAuditing
class ProductServiceTest {

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private ProductService productService;

	private static final String TITLE = "TITLE";
	private static final String IMAGE_URL = "IMAGE_URL";
	private static final String NAME = "NAME";

	@Test
	public void 글_목록_전체_조회하기() throws Exception{
	    // given
		List<Product> products = new ArrayList<>();
		for (int i = 0; i < 10; i++) {
	    	products.add(productRepository.save(Product.builder().title(TITLE).thumbnailImage(IMAGE_URL).build()));
		}

	    // when
		List<ProductSummary> productSummaries = productService.getProducts();

		// then
		assertEquals(10, productSummaries.size());
	}

	@Test
	@Transactional
	public void 글_상세_조회하기_성공() throws Exception{

	    // given
		Category category = categoryRepository.save(Category.builder().name("유모차").build());
		Member member = memberRepository.save(Member.builder().name(NAME).memberType(MemberType.KAKAO).role(Role.USER).build());
		Product product = productRepository.save(Product.builder().title(TITLE).thumbnailImage(IMAGE_URL).category(category).member(member).build());

		// when
		ProductDetailResponse productDetailResponse = productService.getProduct(product.getId());

	    // then
		assertEquals(TITLE, productDetailResponse.getTitle());
	}

	@AfterEach
	void deleteAll() {
		categoryRepository.deleteAll();
		memberRepository.deleteAll();
		productRepository.deleteAll();
	}

}