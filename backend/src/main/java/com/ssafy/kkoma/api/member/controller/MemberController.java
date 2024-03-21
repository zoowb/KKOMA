package com.ssafy.kkoma.api.member.controller;

import com.ssafy.kkoma.api.member.service.MemberService;
import com.ssafy.kkoma.api.offer.service.OfferService;
import com.ssafy.kkoma.api.product.dto.ProductInfoResponse;
import com.ssafy.kkoma.api.product.dto.ProductSummary;
import com.ssafy.kkoma.domain.member.entity.Member;
import com.ssafy.kkoma.domain.product.entity.Product;
import com.ssafy.kkoma.domain.product.repository.ProductRepository;
import com.ssafy.kkoma.global.resolver.memberinfo.MemberInfo;
import com.ssafy.kkoma.global.resolver.memberinfo.MemberInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
private final OfferService offerService;
    @GetMapping("/products")
    ResponseEntity<List<ProductInfoResponse>> getMyProducts(@MemberInfo MemberInfoDto memberInfoDto) {
        Long memberId = memberInfoDto.getMemberId();
        List<ProductInfoResponse> productInfoResponses = memberService.getMyProducts(memberId);
        return ResponseEntity.ok().body(productInfoResponses);
    }


    @GetMapping("/offering-products")
    ResponseEntity<List<ProductInfoResponse>> getMyOfferingProducts(@MemberInfo MemberInfoDto memberInfoDto) {
        Long memberId = memberInfoDto.getMemberId();
        List<ProductInfoResponse> productInfoResponses = offerService.getOfferingProducts(memberId);
        return ResponseEntity.ok().body(productInfoResponses);
    }


}
