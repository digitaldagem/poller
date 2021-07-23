package com.service.poller.storage.polling;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PollingRepository extends JpaRepository<Polling, Long> {
}
