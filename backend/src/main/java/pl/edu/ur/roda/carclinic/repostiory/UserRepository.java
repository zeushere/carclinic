package pl.edu.ur.roda.carclinic.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.edu.ur.roda.carclinic.entity.Role;
import pl.edu.ur.roda.carclinic.entity.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.hibernate.loader.Loader.SELECT;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    boolean existsByEmail(String email);

    boolean existsByLogin(String login);

    Optional<User> findByLogin(String login);

    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndLogin(String email, String login);
}
