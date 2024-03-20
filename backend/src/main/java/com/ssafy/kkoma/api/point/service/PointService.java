package com.ssafy.kkoma.api.point.service;

import com.ssafy.kkoma.api.point.dto.PointSummaryResponse;
import com.ssafy.kkoma.api.point.repository.PointRepository;
import com.ssafy.kkoma.api.member.service.MemberService;
import com.ssafy.kkoma.domain.point.entity.Point;
import com.ssafy.kkoma.domain.member.entity.Member;
import com.ssafy.kkoma.global.error.ErrorCode;
import com.ssafy.kkoma.global.error.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PointService {
    
    private final PointRepository pointRepository;
    private final MemberService memberService;

    public Point findPointByPointId(Long pointId) {
        return pointRepository.findById(pointId)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.POINT_NOT_EXISTS));
    }

    public PointSummaryResponse getPointSummary(Long memberId) {
        return PointSummaryResponse.builder()
                .balance(memberService.getPointBalance(memberId))
                .build();
    }
    
}