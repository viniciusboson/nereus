package com.oceanus.nereus.web.rest;

import com.oceanus.nereus.NereusApp;

import com.oceanus.nereus.domain.Accounts;
import com.oceanus.nereus.repository.AccountsRepository;
import com.oceanus.nereus.service.AccountsService;
import com.oceanus.nereus.service.dto.AccountsDTO;
import com.oceanus.nereus.service.mapper.AccountsMapper;
import com.oceanus.nereus.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.oceanus.nereus.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AccountsResource REST controller.
 *
 * @see AccountsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NereusApp.class)
public class AccountsResourceIntTest {

    private static final ZonedDateTime DEFAULT_CREATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_UPDATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_UPDATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private AccountsRepository accountsRepository;

    @Autowired
    private AccountsMapper accountsMapper;

    @Autowired
    private AccountsService accountsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAccountsMockMvc;

    private Accounts accounts;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AccountsResource accountsResource = new AccountsResource(accountsService);
        this.restAccountsMockMvc = MockMvcBuilders.standaloneSetup(accountsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Accounts createEntity(EntityManager em) {
        Accounts accounts = new Accounts()
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT)
            .description(DEFAULT_DESCRIPTION);
        return accounts;
    }

    @Before
    public void initTest() {
        accounts = createEntity(em);
    }

    @Test
    @Transactional
    public void createAccounts() throws Exception {
        int databaseSizeBeforeCreate = accountsRepository.findAll().size();

        // Create the Accounts
        AccountsDTO accountsDTO = accountsMapper.toDto(accounts);
        restAccountsMockMvc.perform(post("/api/accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountsDTO)))
            .andExpect(status().isCreated());

        // Validate the Accounts in the database
        List<Accounts> accountsList = accountsRepository.findAll();
        assertThat(accountsList).hasSize(databaseSizeBeforeCreate + 1);
        Accounts testAccounts = accountsList.get(accountsList.size() - 1);
        assertThat(testAccounts.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testAccounts.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
        assertThat(testAccounts.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createAccountsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = accountsRepository.findAll().size();

        // Create the Accounts with an existing ID
        accounts.setId(1L);
        AccountsDTO accountsDTO = accountsMapper.toDto(accounts);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountsMockMvc.perform(post("/api/accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Accounts in the database
        List<Accounts> accountsList = accountsRepository.findAll();
        assertThat(accountsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAccounts() throws Exception {
        // Initialize the database
        accountsRepository.saveAndFlush(accounts);

        // Get all the accountsList
        restAccountsMockMvc.perform(get("/api/accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accounts.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(sameInstant(DEFAULT_CREATED_AT))))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(sameInstant(DEFAULT_UPDATED_AT))))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getAccounts() throws Exception {
        // Initialize the database
        accountsRepository.saveAndFlush(accounts);

        // Get the accounts
        restAccountsMockMvc.perform(get("/api/accounts/{id}", accounts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(accounts.getId().intValue()))
            .andExpect(jsonPath("$.createdAt").value(sameInstant(DEFAULT_CREATED_AT)))
            .andExpect(jsonPath("$.updatedAt").value(sameInstant(DEFAULT_UPDATED_AT)))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAccounts() throws Exception {
        // Get the accounts
        restAccountsMockMvc.perform(get("/api/accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAccounts() throws Exception {
        // Initialize the database
        accountsRepository.saveAndFlush(accounts);
        int databaseSizeBeforeUpdate = accountsRepository.findAll().size();

        // Update the accounts
        Accounts updatedAccounts = accountsRepository.findOne(accounts.getId());
        updatedAccounts
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT)
            .description(UPDATED_DESCRIPTION);
        AccountsDTO accountsDTO = accountsMapper.toDto(updatedAccounts);

        restAccountsMockMvc.perform(put("/api/accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountsDTO)))
            .andExpect(status().isOk());

        // Validate the Accounts in the database
        List<Accounts> accountsList = accountsRepository.findAll();
        assertThat(accountsList).hasSize(databaseSizeBeforeUpdate);
        Accounts testAccounts = accountsList.get(accountsList.size() - 1);
        assertThat(testAccounts.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testAccounts.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
        assertThat(testAccounts.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingAccounts() throws Exception {
        int databaseSizeBeforeUpdate = accountsRepository.findAll().size();

        // Create the Accounts
        AccountsDTO accountsDTO = accountsMapper.toDto(accounts);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAccountsMockMvc.perform(put("/api/accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountsDTO)))
            .andExpect(status().isCreated());

        // Validate the Accounts in the database
        List<Accounts> accountsList = accountsRepository.findAll();
        assertThat(accountsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAccounts() throws Exception {
        // Initialize the database
        accountsRepository.saveAndFlush(accounts);
        int databaseSizeBeforeDelete = accountsRepository.findAll().size();

        // Get the accounts
        restAccountsMockMvc.perform(delete("/api/accounts/{id}", accounts.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Accounts> accountsList = accountsRepository.findAll();
        assertThat(accountsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Accounts.class);
        Accounts accounts1 = new Accounts();
        accounts1.setId(1L);
        Accounts accounts2 = new Accounts();
        accounts2.setId(accounts1.getId());
        assertThat(accounts1).isEqualTo(accounts2);
        accounts2.setId(2L);
        assertThat(accounts1).isNotEqualTo(accounts2);
        accounts1.setId(null);
        assertThat(accounts1).isNotEqualTo(accounts2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccountsDTO.class);
        AccountsDTO accountsDTO1 = new AccountsDTO();
        accountsDTO1.setId(1L);
        AccountsDTO accountsDTO2 = new AccountsDTO();
        assertThat(accountsDTO1).isNotEqualTo(accountsDTO2);
        accountsDTO2.setId(accountsDTO1.getId());
        assertThat(accountsDTO1).isEqualTo(accountsDTO2);
        accountsDTO2.setId(2L);
        assertThat(accountsDTO1).isNotEqualTo(accountsDTO2);
        accountsDTO1.setId(null);
        assertThat(accountsDTO1).isNotEqualTo(accountsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(accountsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(accountsMapper.fromId(null)).isNull();
    }
}
