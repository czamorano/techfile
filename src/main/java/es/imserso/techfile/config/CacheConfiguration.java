package es.imserso.techfile.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(es.imserso.techfile.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(es.imserso.techfile.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Autonomia.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Autonomia.class.getName() + ".provincias", jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Provincia.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Mes.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.PensionConcurrente.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.TipoRelacion.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.RegimenProcedencia.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Persona.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Pensionista.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Pensionista.class.getName() + ".convivientes", jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Pensionista.class.getName() + ".discapacidads", jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Pensionista.class.getName() + ".diagnosticos", jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Pensionista.class.getName() + ".etiologias", jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Conviviente.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Perceptor.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Fichero.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Fichero.class.getName() + ".pensionistas", jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Fichero.class.getName() + ".mes", jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.FicheroByte.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Discapacidad.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Discapacidad.class.getName() + ".pensionistas", jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Diagnostico.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Diagnostico.class.getName() + ".pensionistas", jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Etiologia.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Etiologia.class.getName() + ".pensionistas", jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Usuario.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Fichero.class.getName() + ".procesos", jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Cierre.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Proceso.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.Proceso.class.getName() + ".errorRegistros", jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.ErrorRegistro.class.getName(), jcacheConfiguration);
            cm.createCache(es.imserso.techfile.domain.TipoError.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
